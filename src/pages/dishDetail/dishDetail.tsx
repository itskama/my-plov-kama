import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";
import { IDish } from "../../types";
import { Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";

const DishDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [dish, setDish] = useState<IDish | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDish = async () => {
            try {
                setLoading(true);
                console.log(`➡ Загружаю блюдо с ID: ${id}`);

                const response = await axiosApi.get(`/dishes/${id}.json`);

                console.log("✅ Ответ от Firebase:", response.data);

                if (!response.data) {
                    console.warn("⚠ Блюдо не найдено!");
                    setDish(null);
                    return;
                }

                // 🔥 Добавляем ID вручную
                setDish({ ...response.data, id });
            } catch (error) {
                console.error("❌ Ошибка при загрузке блюда:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDish();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (!dish) return <Typography style={{ textAlign: "center" }}>⚠ Блюдо не найдено!</Typography>;

    return (
        <Card sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
            <CardContent>
                <Typography variant="h4">{dish.name}</Typography>
                <Typography variant="body1">{dish.description}</Typography>
                <Typography variant="h6">Цена: {dish.price} сом</Typography>
                <Button variant="contained" color="error" onClick={() => navigate("/")} sx={{ marginTop: 2 }}>
                    Назад
                </Button>
            </CardContent>
        </Card>
    );
};

export default DishDetail;