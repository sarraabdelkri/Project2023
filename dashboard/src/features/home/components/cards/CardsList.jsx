import { useDraggable } from "react-use-draggable-scroll";
import { useRef } from "react";
import ColoredCard from "./ColoredCard";
import "@components/ui/scroller/scroller.less";

const CardsList = () => {
    const cards = [
        {
            title: "New users",
            value: "3",
            icon: "shopping-bag",
            color: "bg-purple-700",
        },
        {
            title: "Contracts",
            value: "4",
            icon: "shopping-bag",
            color: "bg-emerald-600",
        },

        {
            title: "Jobs open",
            value: "5",
            icon: "ticket",
            color: "bg-red-600",
        },
        {
            title: "Quizzes passed",
            value: "12",
            icon: "shopping-bag",
            color: "bg-rose-600",
        },

        {
            title: "Pending applications",
            value: "4",
            icon: "price-tag",
            color: "bg-orange-600",
        },
    ];

    const ref = useRef();
    const { events } = useDraggable(ref);

    return (
        <div
            className="h-scroller flex gap-5 overflow-x-auto pr-6 cursor-grab w-full"
            {...events}
            ref={ref}
        >
            {cards.map((card, index) => (
                <div key={index}>
                    <ColoredCard {...card} />
                </div>
            ))}
        </div>
    );
};

export default CardsList;
