from flask import current_app
from app.models.productModel import Product

class ProductService:
    @staticmethod
    def getAllProducts():
        try:
            products_data = current_app.db.products.find()
            products = [Product.from_dict(pro) for pro in products_data]
            for product in products:
                product._id = str(product._id)
            return products
        except Exception as e:
            raise Exception(f"¡Error al obtener Productos!: {str(e)}")

    @staticmethod
    def create_product(img, name, category, price, stock, description, cost, state):
        try:
            product = Product(img=img, name=name, category=category, price=price, stock=stock, description=description, cost=cost, state=state)
            product_data = product.to_dict()
            current_app.db.products.insert_one(product_data)
            return product
        except Exception as e:
            raise Exception(f"¡Error al insertar producto!: {str(e)}")


    @staticmethod
    def get_product_by_id(id):
        try:
            product_data = current_app.db.products.find_one({'_id': id})
            if product_data:
                return Product.from_dict(product_data)
            return None
        except Exception as e:
            raise Exception(f"¡Error al obtener producto!: {str(e)}")

    @staticmethod
    def update_product(id, new_data):
        try:
            current_app.db.products.update_one({'_id': id}, {'$set': new_data})
        except Exception as e:
            raise Exception(f"¡Error al actualizar producto!: {str(e)}")

    @staticmethod
    def delete_product(id):
        try:
            result = current_app.db.products.delete_one({'_id': id})
            if result.deleted_count == 0:
                raise Exception("Producto no encontrado")
        except Exception as e:
            raise Exception(f"¡Error al eliminar Producto!: {str(e)}")
