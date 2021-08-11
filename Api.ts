import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { API_URL } from 'react-native-dotenv';
import { StateModel } from './model/stateModel';
import { Todo } from './types/todoReducer';

class API {
    static async getList() {
        const uri = API_URL + '/list';
        const response = await axios.get<StateModel[]>(uri);
        const stateModel = plainToClass(StateModel, response.data);
        return stateModel;
    }

    static async deleteListItemRequest(payload: { todoId: number; listId: number }) {
        const uri = API_URL + `/list/${payload.listId}/todo/${payload.todoId}`;
        await axios.delete(uri);
    }

    static async createdNewTodoRequest(valueRaduo: number, todoTextInput: string) {
        const uri = API_URL + `/list/${valueRaduo}/todo`;
        const response = await axios.post<Todo>(uri, { text: todoTextInput });
        return response.data;
    }

    static async editorTodoRequest(
        valueRaduo: number,
        editTodo: Todo,
        todoTextInput: string,
        checked = false,
    ) {
        const uri = API_URL + `/list/${valueRaduo}/todo/${editTodo?.id}`;
        await axios.patch(uri, { text: todoTextInput, checked });
    }

    static async createCategoryRequest(text: string) {
        const uri = API_URL + '/list';
        const response = await axios.post<StateModel>(uri, { title: text });
        return response.data;
    }

    static async deleteCategoryRequest(id: number) {
        const uri = API_URL + '/list';
        await axios.delete(uri + `/${id}`);
    }
}

export default API;
