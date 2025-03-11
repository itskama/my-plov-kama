import { Card, CardContent, Typography, Button } from "@mui/material";
import { IDish } from "../../types";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

interface Props {
    dish: IDish;
}

const DishCard: React.FC<Props> = ({ dish }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    return (
        <Card sx={{ maxWidth: 345, cursor: "pointer", margin: 2 }}>
            <CardContent onClick={() => navigate(`/dishes/${dish.id}`)}>
                <Typography variant="h5">{dish.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Цена: {dish.price} сом
                </Typography>
            </CardContent>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => addToCart({ id: dish.id, name: dish.name, price: dish.price, quantity: 1 })}
                sx={{ width: "100%" }}
            >
                Добавить в корзину
            </Button>
        </Card>
    );
};

export default DishCard;
