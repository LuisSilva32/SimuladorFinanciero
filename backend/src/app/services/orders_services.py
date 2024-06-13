from flask import current_app
from datetime import datetime, timedelta
from app.models.orderModels import Order

class OrdersService:


    @staticmethod
    def getAllOrders():
        try:
            orders_data = current_app.db.pedidos.find({}).sort("Fecha", -1).limit(100)
            orders = [Order.from_dict(orde) for orde in orders_data]
            for order in orders:
                order._id = str(order._id)
            return orders
        except Exception as e:
            raise Exception(f"¡Error al obtener Pedidos!: {str(e)}")



    @staticmethod
    def count_orders():
        try:
        
        # Count the documents with a Fecha greater than or equal to the threshold
            count = current_app.db.pedidos.count_documents({})
        
            return count
        except Exception as e:
            raise Exception(f"Error al contar pedidos: {str(e)}")


    @staticmethod
    def earnings():
        try:
            total_earnings = 0

            # date_threshold = datetime(2023, 7, 1)
            
            orders = current_app.db.pedidos.find({})

            for order in orders:
                order_earnings = 0

                # Obtener el id_producto y cantidad vendida del pedido
                product_id = order['id_producto']
                cantidad = float(order['Cantidad'])

                # Obtener el costo del producto desde la colección de productos
                product_info = current_app.db.products.find_one({"_id": product_id})
                if product_info:
                    cost = float(product_info['cost'])

                    # Calcular la ganancia por este pedido
                    order_earnings = (order['precio_total']) -  ( cantidad * cost)

                # Sumar la ganancia del pedido al total de ganancias
                total_earnings += order_earnings

            return total_earnings

        except Exception as e:
            raise Exception(f"Error al calcular ganancias: {str(e)}")
    
    @staticmethod
    def sales():
        try:
            # Define the start date
            start_date = datetime(2024, 1, 3)
            # Set the end date to the current date
            end_date = datetime.now()

            # Fetch orders within the date range
            orders_data = current_app.db.pedidos.find({
                "Fecha": {"$gte": start_date, "$lte": end_date}
            })

            # Initialize a dictionary to hold the sales totals
            sales_totals = {
                "Enero": 0,
                "Febrero": 0,
                "Marzo": 0,
                "Abril": 0,
                "Mayo": 0,
                "Junio": 0
            }

            # Map month numbers to month names
            month_map = {
                1: "Enero",
                2: "Febrero",
                3: "Marzo",
                4: "Abril",
                5: "Mayo",
                6: "Junio"
            }

            # Process each order
            for order_data in orders_data:
                order = Order.from_dict(order_data)
                order_date = order.Fecha  # This is already a datetime object
                month_name = month_map[order_date.month]
                sales_totals[month_name] += order.precio_total

            # Convert the dictionary to a list of dictionaries
            sales_totals_list = [{"name": month, "total": total} for month, total in sales_totals.items()]

            return sales_totals_list

        except Exception as e:
            raise Exception(f"Error al obtener totales de ventas mensuales: {str(e)}")
    
    def sales_data():
        try:
        # Obtener la fecha actual y calcular el rango de las últimas dos semanas
            now = datetime.now()
            end_of_last_week = now - timedelta(days=now.weekday() + 1)
            start_of_last_week = end_of_last_week - timedelta(days=6)
            start_of_week_before_last = start_of_last_week - timedelta(days=7)
            
            # Obtener las ventas de la última semana
            last_week_sales = current_app.db.pedidos.find({
                "Fecha": {"$gte": start_of_last_week, "$lte": end_of_last_week}
            })
            
            # Obtener las ventas de la semana pasada
            week_before_last_sales = current_app.db.pedidos.find({
                "Fecha": {"$gte": start_of_week_before_last, "$lte": start_of_last_week}
            })
            
            # Calcular los totales de ventas
            last_week_total = sum(order["precio_total"] for order in last_week_sales)
            week_before_last_total = sum(order["precio_total"] for order in week_before_last_sales)
            
            # Calcular la diferencia y el porcentaje
            sales_difference = last_week_total - week_before_last_total
            percentage_to_target = (last_week_total / week_before_last_total) * 100 if week_before_last_total > 0 else 0
            
            return {
                "last_week_total": last_week_total,
                "week_before_last_total": week_before_last_total,
                "sales_difference": sales_difference,
                "percentage_to_target": percentage_to_target
            }
        except Exception as e:
            raise Exception(f"¡Error al obtener datos de ventas!: {str(e)}")
