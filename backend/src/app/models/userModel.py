from bson.objectid import ObjectId

class User:
    def __init__(self, _id=None, photo=None, fullName=None, email=None, phone=None, state=None, password=None, post=None, address=None, city=None, postalCode=None):
        self._id = _id if _id else ObjectId()
        self.photo = photo
        self.fullName = fullName
        self.email = email
        self.phone = phone
        self.state = state
        self.password = password
        self.post = post
        self.address = address
        self.city = city
        self.postalCode = postalCode

    def to_dict(self):
        return {
            '_id': str(self._id),
            'photo': self.photo,
            'fullName': self.fullName,
            'email': self.email,
            'phone': self.phone,
            'state': self.state,
            'password': self.password,
            'post': self.post,
            'address': self.address,
            'city': self.city,
            'postalCode': self.postalCode
        }

    @staticmethod
    def from_dict(data):
        return User(
            _id=data.get('_id'),
            photo=data.get('photo'),
            fullName=data.get('fullName'),
            email=data.get('email'),
            phone=data.get('phone'),
            state=data.get('state'),
            password=data.get('password'),
            post=data.get('post'),
            address=data.get('address'),
            city=data.get('city'),
            postalCode=data.get('postalCode')
        )
