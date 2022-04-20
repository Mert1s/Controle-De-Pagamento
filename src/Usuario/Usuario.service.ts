import { getRepository } from "typeorm";
import { Usuario } from "./Usuario.entity";
import {IUsuarioService} from "./Usuario.interface";

export class UsuarioService implements IUsuarioService {
    async findAll(): Promise<Usuario[]> {
        return await getRepository(Usuario).find({order: {id:"ASC"}} );
    }

    async findOne(id: number): Promise<Usuario | undefined> {
        try {
            const Repositorio = await getRepository(Usuario).findOne(id)

            if (!Repositorio) throw 'Usuário não encontrado'

            return Repositorio;
        } catch (error) {
            throw 'Erro findOne: ' + error
        }
    }

    async save(user: Usuario): Promise<Usuario> {
        try {
            return await getRepository(Usuario).save(user)
        } catch (error) {
            throw 'Erro save: ' + error
        }
    }

    async delete(id: number): Promise<Boolean> {

        try {
            await this.findOne(id)

            const resultado = await getRepository(Usuario).delete(id)
            if (!!resultado.affected)
                return true;
            else
                return false
        }
        catch (error) {
            throw 'Erro delete: ' + error
        }
    }

    async update(id: number, user: Usuario): Promise<Usuario | undefined> {
        try {
            await this.findOne(id)

            user.id = id;
            const model = await getRepository(Usuario).create(user);
            return await getRepository(Usuario).save(model);;
        } catch (error) {
            throw 'Erro update: ' + error
        }
    }
}