const jwt = require('jsonwebtoken');
import {User} from "../entity/User";
import {Product} from "../entity/Product";
import "reflect-metadata";
const bcrypt = require('bcryptjs');

class UsersService {

    register = async ({firstName, lastName, email, password}) => {
        try {
            const user = await User.find({firstName})
            if (user[0] === undefined) {
                const salt = bcrypt.genSaltSync(10);
                const hashedPass = bcrypt.hashSync(password, salt);
                const user = User.create({firstName, lastName, email, password: hashedPass})
                await user.save()
                return 'user saved'
            } else {
                return 'user already registered'
            }
        } catch (e) {
            return e
        }
    }

    login = async ({email, password}) => {
        try {
            const user = await User.find({email})
            console.log(user, 1)
            if (user[0] === undefined) {
                return 'no such user'
            } else {
                if (bcrypt.compareSync(password, user[0].password)) {
                    const refreshToken = jwt.sign(email, 'somerefreshsecretkey', { expiresIn: '24h' })
                    const accessToken = jwt.sign({email}, 'somesecretkey', { expiresIn: '1m'})
                    return {accessToken, refreshToken, user: user[0]}
                } else {
                    return 'wrong password'
                }
            }
        } catch (e) {
            return e
        }
    }

    getUsers = async () => {
        try {
            const users = await User.find()
            return users
        } catch (e) {
            return e
        }
    }

    updateUser = async (body, id) => {
        try {
            const user = await User.findOne({ id })
            user.firstName = body.firstName
            user.lastName = body.lastName
            user.email = body.email
            user.password = body.password
            await user.save()
            return 'user updated'
        } catch (e) {
            return e
        }
    }

    deleteUser = async (id) => {
        try {
            const user = await User.findOne({ id })
            await user.remove()
            return 'user deleted'
        } catch (e) {
            return e
        }
    }

    token = async ({refreshToken}) => {
        try {
            const checkRefresh = jwt.verify(refreshToken, 'somerefreshsecretkey');
            if (checkRefresh) {
                const accessToken = jwt.sign({checkRefresh}, 'somesecretkey', { expiresIn: '1m'})
                return accessToken
            } else {
                return 'token is not valid'
            }
        } catch (e) {
            return e
        }
    }

    getProducts = async (page:string, limit:string) => {
        try {
            if (page === undefined || limit === undefined && (page === undefined && limit === undefined)) {
                const products = await Product.find()
                return products
            } else {
                const products = await Product.find()
                const start = (Number(page) - 1) * Number(limit)
                const end = Number(page) * Number(limit)
                const paginatedProducts = products.slice(start, end)
                console.log(paginatedProducts)
                return paginatedProducts
            }
        } catch (e) {
            return e
        }
    }

    addProduct = async ({title, type, price, picture}) => {
        try {
            const product = await Product.find({title})
            if (product[0] === undefined) {
                const newProduct = Product.create({title, type, price, picture})
                await newProduct.save()
                return 'product saved'
            }
        } catch (e) {
            return e
        }
    }

    changeProduct = async (body, id) => {
        try {
            const product = await Product.findOne({ id })
            product.price = body.price
            product.picture = body.picture
            product.title = body.title
            product.type = body.type
            product.save()
            return 'product changed'
        } catch (e) {
            return e
        }
    }

    deleteProduct = async (id) => {
        try {
            const product = await Product.findOne({ id })
            await product.remove()
            return 'product deleted'
        } catch (e) {
            return e
        }
    }
 
}


export const usersService = new UsersService();