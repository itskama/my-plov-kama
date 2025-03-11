import { Box, Button, Typography, Card, CardContent, IconButton } from "@mui/material";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const BasketPage = () => {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
            <Typography variant="h4" gutterBottom>Корзина</Typography>
            {cart.length === 0 ? (
                <Typography>Корзина пуста</Typography>
            ) : (
                cart.map(item => (
                    <Card key={item.id} sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography>Цена: {item.price} сом</Typography>
                            <Typography>Количество: {item.quantity}</Typography>
                            <Box>
                                <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    <AddIcon />
                                </IconButton>
                                <IconButton onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={() => removeFromCart(item.id)}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            )}
            <Typography variant="h5">Итого: {totalPrice} сом</Typography>
            {cart.length > 0 && (
                <>
                    <Button variant="contained" color="error" onClick={clearCart} sx={{ marginRight: 2 }}>
                        Очистить корзину
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => navigate("/checkout")}>Оформить заказ</Button>
                </>
            )}
        </Box>
    );
};

export default BasketPage;
