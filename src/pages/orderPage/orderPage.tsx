import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Button, Card, CardContent } from "@mui/material";
import axiosApi from "../../axiosApi";

interface Order {
    id: string;
    name: string;
    address: string;
    phone: string;
    items: any[];
    status: string;
}

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosApi.get<{ [key: string]: Order }>("/orders.json");
                const loadedOrders = response.data ? Object.entries(response.data).map(([id, data]) => ({ id, ...data })) : [];
                setOrders(loadedOrders);
            } catch (error) {
                console.error("Ошибка загрузки заказов:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const markAsCompleted = async (id: string) => {
        try {
            await axiosApi.patch(`/orders/${id}.json`, { status: "completed" });
            setOrders(orders.map(order => order.id === id ? { ...order, status: "completed" } : order));
        } catch (error) {
            console.error("Ошибка обновления заказа:", error);
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
            <Typography variant="h4" gutterBottom>Список заказов</Typography>
            {orders.length === 0 && <Typography>Заказов пока нет</Typography>}
            {orders.map(order => (
                <Card key={order.id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">Заказ от: {order.name}</Typography>
                        <Typography>Адрес: {order.address}</Typography>
                        <Typography>Телефон: {order.phone}</Typography>
                        <Typography>Статус: {order.status === "completed" ? "✅ Выполнен" : "⏳ В ожидании"}</Typography>
                        {order.status !== "completed" && (
                            <Button variant="contained" color="success" onClick={() => markAsCompleted(order.id)}>
                                Отметить выполненным
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default OrdersPage;
