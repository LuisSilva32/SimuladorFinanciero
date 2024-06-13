from flask import jsonify, request
from app.services.orders_services import OrdersService



class OrdersController:
    @staticmethod
    def getAllOrders():
        try:
            orders = OrdersService.getAllOrders()
            orders_dicts = [order.to_dict() for order in orders]
            return jsonify(orders_dicts), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500
        
    @staticmethod
    def earnings():
        try:
            # Calcular las ganancias usando el servicio
            earnings = OrdersService.earnings()

            return jsonify({'earnings': earnings}), 200

        except Exception as e:
            return jsonify({'message': str(e)}), 500
        
    @staticmethod
    def count():
        try:
            count = OrdersService.count_orders()
            return jsonify({'count': count}), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500


    @staticmethod
    def sales():
        try:
            total_sales = OrdersService.sales()
            return jsonify(total_sales), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500
        
    @staticmethod   
    def sales_data():
        try:
            data = OrdersService.sales_data()
            return jsonify(data), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500