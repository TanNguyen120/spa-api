import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private TodoModel: Model<TodoDocument>) {}
  async create(createTodoDto: CreateTodoDto) {
    const checkContent = await this.TodoModel.exists({
      content: createTodoDto.content,
    });
    if (checkContent) {
      return null;
    }
    const newTodo = new this.TodoModel(createTodoDto);
    return newTodo.save();
  }

  findAll() {
    return this.TodoModel.find();
  }

  findOne(id: string) {
    return this.TodoModel.findById(id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.TodoModel.findByIdAndUpdate(id, updateTodoDto, { new: true });
  }

  remove(id: string) {
    return this.TodoModel.findByIdAndRemove(id);
  }

  doneTodo(content: string) {
    return this.TodoModel.findOneAndUpdate(
      { content: content },
      { done: true },
    );
  }
}
