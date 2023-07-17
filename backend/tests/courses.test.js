const Course = require("../model/course");
const User = require("../model/userModel");
const {
  getAllCourses,
  deleteCourse,
  addCourse,
  getById,
  filterCoursesByPrice,
  addCourseToWishList,
} = require("../controller/courseController");
describe("addCourse", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        name: "Test Course",
        description: "This is a test course",
        category: "Test Category",
        duration: 10,
        startdate: new Date(),
        enddate: new Date(),
        price: 50,
      },
      file: {
        buffer: Buffer.from("test"),
        mimetype: "text/plain",
      },
      params: {
        instructorId: "test-instructor-id",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if instructor is not found", async () => {
    User.findOne = jest.fn().mockResolvedValueOnce(null);

    await addCourse(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({
      _id: "test-instructor-id",
      role: "instructor",
    });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Instructor not found");
    expect(next).not.toHaveBeenCalled();
  });
});

describe("getAllCourses", () => {
  it("should return all courses when there are courses in the database", async () => {
    const mockCourses = [
      { _id: "1", name: "Course 1" },
      { _id: "2", name: "Course 2" },
      { _id: "3", name: "Course 3" },
    ];
    jest.spyOn(Course, "find").mockResolvedValue(mockCourses);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAllCourses(req, res, next);

    expect(Course.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ courses: mockCourses });
    expect(next).not.toHaveBeenCalled();
  });
});
describe("deleteCourse", () => {
  it("should delete a course when a valid id is provided", async () => {
    const mockCourse = { _id: "1", name: "Course 1" };
    jest.spyOn(Course, "findByIdAndRemove").mockResolvedValue(mockCourse);

    const req = {
      params: {
        id: "1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await deleteCourse(req, res, next);

    expect(Course.findByIdAndRemove).toHaveBeenCalledTimes(1);
    expect(Course.findByIdAndRemove).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Course Successfully Deleted",
    });
    expect(next).not.toHaveBeenCalled();
  });

  describe("getById", () => {
    const req = {
      params: { id: "6433087b1180ad4a7b86e812" },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return a course when a valid id is provided", async () => {
      const mockCourse = {
        _id: "6433087b1180ad4a7b86e812",
        name: "Test Course",
        description: "Test Course Description",
        category: "Computer Science",
        duration: 5,
        startdate: "2023-06-01",
        enddate: "2023-06-30",
        price: 100,
      };
      jest.spyOn(Course, "findById").mockResolvedValueOnce(mockCourse);

      await getById(req, res, next);

      expect(Course.findById).toHaveBeenCalledWith("6433087b1180ad4a7b86e812");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ course: mockCourse });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return a 404 status when an invalid id is provided", async () => {
      jest.spyOn(Course, "findById").mockResolvedValueOnce(null);

      await getById(req, res, next);

      expect(Course.findById).toHaveBeenCalledWith("6433087b1180ad4a7b86e812");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "No Course found" });
      expect(next).not.toHaveBeenCalled();
    });
  });
  describe("filterCoursesByPrice", () => {
    const req = {
      query: {
        minPrice: 100,
        maxPrice: 200,
      },
    };
    const res = {
      json: jest.fn(),
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return a list of courses within the price range", async () => {
      const mockCourses = [
        { _id: "1", name: "Course 1", price: 150 },
        { _id: "2", name: "Course 2", price: 175 },
      ];
      jest.spyOn(Course, "find").mockResolvedValueOnce(mockCourses);

      await filterCoursesByPrice(req, res);

      expect(Course.find).toHaveBeenCalledWith({
        price: { $gte: 100, $lte: 200 },
      });
      expect(res.json).toHaveBeenCalledWith(mockCourses);
    });

    it("should return an empty list if no courses are within the price range", async () => {
      jest.spyOn(Course, "find").mockResolvedValueOnce([]);

      await filterCoursesByPrice(req, res);

      expect(Course.find).toHaveBeenCalledWith({
        price: { $gte: 100, $lte: 200 },
      });
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe("addCourseToWishList", () => {
    const req = {
      params: {
        userId: "6440b525958167c58602f9c7",
        courseId: "6433087b1180ad4a7b86e812",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should add a course to the user favorites when valid user and course ids are provided", async () => {
      const mockUser = {
        _id: "6440b525958167c58602f9c7",
        favorites: [],
        save: jest.fn(),
      };
      const mockCourse = {
        _id: "6433087b1180ad4a7b86e812",
        name: "Sample Course",
        description: "Sample Course Description",
        category: "Computer Science",
        duration: 10,
        startdate: "2023-05-01",
        enddate: "2023-05-31",
        price: 200,
      };
      jest.spyOn(User, "findById").mockResolvedValueOnce(mockUser);
      jest.spyOn(Course, "findById").mockResolvedValueOnce(mockCourse);

      await addCourseToWishList(req, res);

      expect(User.findById).toHaveBeenCalledWith("6440b525958167c58602f9c7");
      expect(Course.findById).toHaveBeenCalledWith("6433087b1180ad4a7b86e812");
      expect(mockUser.favorites).toContainEqual(mockCourse);
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: "Course added to favorites",
      });
    });

    it("should return 404 status when user is not found", async () => {
      jest.spyOn(User, "findById").mockResolvedValueOnce(null);
      jest.spyOn(Course, "findById").mockResolvedValueOnce({});

      await addCourseToWishList(req, res);

      expect(User.findById).toHaveBeenCalledWith("6440b525958167c58602f9c7");
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should return 404 status when course is not found", async () => {
      jest.spyOn(User, "findById").mockResolvedValueOnce({});
      jest.spyOn(Course, "findById").mockResolvedValueOnce(null);

      await addCourseToWishList(req, res);

      expect(User.findById).toHaveBeenCalledWith("6440b525958167c58602f9c7");
      expect(Course.findById).toHaveBeenCalledWith("6433087b1180ad4a7b86e812");
      expect(res.json).toHaveBeenCalledWith({ message: "Course not found" });
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should return 500 status when an error occurs", async () => {
      jest
        .spyOn(User, "findById")
        .mockRejectedValueOnce(new Error("Database error"));
      jest.spyOn(Course, "findById").mockResolvedValueOnce({});

      await addCourseToWishList(req, res);

      expect(User.findById).toHaveBeenCalledWith("6440b525958167c58602f9c7");
      expect(Course.findById).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});