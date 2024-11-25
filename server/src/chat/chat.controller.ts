import { ChatService } from './chat.service';
import { Controller, Get, Param, Post, Body, BadRequestException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all-chats')
  async getAllChats(@Request() req) {
    const userId = req.user.id;
    return this.chatService.getAllChats(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':receiverId/sendMessage')
  async sendPersonalMessage(@Param('receiverId') receiverId: number, @Body() requestBody: any, @Request() req) {
  const userId = req.user.id;
  const recId = parseInt(receiverId.toString(), 10);

  if (!requestBody || typeof requestBody.message !== 'string') {
    throw new BadRequestException('Invalid message provided');
  }

  const message = requestBody.message;

  return this.chatService.sendPersonalMessage(userId, recId, message);
}

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId')
  async getChatMessages(@Param('userId') receiverId: string, @Request() req) {

    const currUserId = req.user.id;
    const recId = parseInt(receiverId.toString(), 10);

    return this.chatService.getChatMessages(currUserId, recId);
  }
}