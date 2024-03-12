import { IsNotEmpty, IsNumber, IsString } from "class-validator";

  export class SendInvitationDto {
      @IsNumber()
      @IsNotEmpty()
      groupId: number;
  
      @IsString()
      @IsNotEmpty()
      userEmail: string;
  }