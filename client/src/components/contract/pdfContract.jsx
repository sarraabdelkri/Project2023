import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { saveAs } from "file-saver";

function PdfContract() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    useEffect(() => {
        const url = `https://expertise-shaper-37ut.onrender.com/api/contract/fetch-pdf/${userId}`;
        axios
            .get(url, {
                responseType: "blob",
            })
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: "application/pdf" });
                saveAs(pdfBlob, "contract.pdf");
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Sorry, an error occurred: {error.message}</p>
            ) : (
                <object
                    data={`https://expertise-shaper-37ut.onrender.com/api/contract/fetch-pdf/${userId}`}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                >
                    <p>
                        PDF cannot be displayed in your browser,{" "}
                        <a href={`https://expertise-shaper-37ut.onrender.com/api/contract/fetch-pdf/${userId}`}>
                            click here to download the PDF
                        </a>
                    </p>
                </object>
            )}
        </div>
    );
}

export default PdfContract;