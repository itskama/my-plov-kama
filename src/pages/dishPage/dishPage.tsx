import { useState } from "react";
import { DishForm } from "../../components/dishForm/dishForm";
import { IDishShort } from "../../types";
import axiosApi from "../../axiosApi";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const DishPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const addDishHandler = async (dishData: IDishShort) => {
        setLoading(true);
        try {
            await axiosApi.post("/dishes.json", dishData);
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <CircularProgress />}
            <DishForm onSubmit={addDishHandler} />
        </div>
    );
};

export default DishPage;