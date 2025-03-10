import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";
import { IDish } from "../../types";
import { DishForm } from "../../components/dishForm/dishForm";
import { CircularProgress } from "@mui/material";

const EditDish = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dishData, setDishData] = useState<IDish | null>(null);

    useEffect(() => {
        const fetchDish = async () => {
            try {
                setLoading(true);
                const response = await axiosApi.get<IDish | null>(`/dishes/${id}.json`);
                setDishData(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке блюда:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDish();
    }, [id]);

    const handleEditDish = async (updatedDish: IDish) => {
        setLoading(true);
        try {
            await axiosApi.put(`/dishes/${id}.json`, updatedDish);
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <CircularProgress />;
    if (!dishData) return <p>Блюдо не найдено</p>;

    return <DishForm onSubmit={handleEditDish} initialData={dishData} />;
};

export default EditDish;