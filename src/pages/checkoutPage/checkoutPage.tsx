import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";
import { useCart } from "../../hooks/useCart"; 

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cart, updateQuantity, clearCart } = useCart();
    const [orderData, setOrderData] = useState({ name: "", address: "", phone: "" });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const handleOrder = async () => {
        if (!orderData.name || !orderData.address || !orderData.phone) {
            alert("Заполните все поля!");
            return;
        }
        
        const order = { items: cart, ...orderData };
        try {
            await axiosApi.post("/orders.json", order);
            clearCart();
            navigate("/orders");
        } catch (error) {
            console.error("Ошибка оформления заказа:", error);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
            <Typography variant="h4" gutterBottom>Оформление заказа</Typography>
            <TextField name="name" label="Имя" fullWidth margin="normal" onChange={handleChange} required />
            <TextField name="address" label="Адрес" fullWidth margin="normal" onChange={handleChange} required />
            <TextField name="phone" label="Телефон" fullWidth margin="normal" onChange={handleChange} required />
            <Button variant="contained" color="primary" fullWidth onClick={handleOrder}>
                Оформить заказ
            </Button>
        </Box>
    );
};

export default CheckoutPage;
