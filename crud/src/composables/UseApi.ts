import { api } from '../boot/axios';

export default function useApi(url : string) {
    const list = async () => {
        try {
            const { data } = await api.get(url)
            return data
        } catch (error) {
            throw new Error("erro")
        }
    }

    const post = async (form : any) => {
        try {
            const { data } = await api.post(url, form)
            return data
        } catch (error) {
            throw new Error("erro")
        }
    }

    async function update(form : any) {
        try {
            const { data } = await api.put(`${url}/${form.id}`, form);
            return data;
        } catch (error) {
            throw new Error("erro");
        }
    }

    const remove = async (id : any) => {
        try {
            const { data } = await api.delete(`${url}/${id}`)
            return data
        } catch (error) {
            throw new Error("erro")
        }
    }

    return{
        list,
        post,
        update,
        remove
    }
}