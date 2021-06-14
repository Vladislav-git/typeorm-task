import { Response, Request } from "express";
const {usersService} = require('../services/services');


class UsersController {

	service = usersService;
    

    register = async (req: Request, res: Response) => {
        res.send(await this.service.register(req.body))
    }

    login = async (req: Request, res: Response) => {
        res.send(await this.service.login(req.body))
    }

    getUsers = async (req: Request, res: Response) => {
        res.send(await this.service.getUsers(req.body))
    }

    updateUser = async (req: Request, res: Response) => {
        res.send(await this.service.updateUser(req.body, req.params.id))
    }

    deleteUser = async (req: Request, res: Response) => {
        res.send(await this.service.deleteUser(req.params.id))
    }

    token = async (req: Request, res: Response) => {
        res.send(await this.service.token(req.body))
    }

    getProducts = async (req: Request, res: Response) => {
        res.send(await this.service.getProducts(req.query.page, req.query.limit))
    }

    addProduct = async (req: Request, res: Response) => {
        res.send(await this.service.addProduct(req.body))
    }

    changeProduct = async (req: Request, res: Response) => {
        res.send(await this.service.changeProduct(req.body, req.params.id))
    }

    deleteProduct = async (req: Request, res: Response) => {
        res.send(await this.service.deleteProduct(req.params.id))
    }
}

export const controller = new UsersController();