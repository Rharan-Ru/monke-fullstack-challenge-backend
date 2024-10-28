import { validate } from 'class-validator';
import { CreateUserDto } from '../../../application/user/dto/create-user.dto';

describe('CreateUserDto', () => {
  it('should validate a valid CreateUserDto', async () => {
    const dto = new CreateUserDto();
    dto.email = 'valid@example.com';
    dto.password = 'strongpassword';

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should invalidate when email is empty', async () => {
    const dto = new CreateUserDto();
    dto.email = '';
    dto.password = 'strongpassword';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('email');
  });

  it('should invalidate when email is not in correct format', async () => {
    const dto = new CreateUserDto();
    dto.email = 'invalid-email';
    dto.password = 'strongpassword';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('email');
  });

  it('should invalidate when password is empty', async () => {
    const dto = new CreateUserDto();
    dto.email = 'valid@example.com';
    dto.password = '';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('password');
  });

  it('should invalidate when password is too short', async () => {
    const dto = new CreateUserDto();
    dto.email = 'valid@example.com';
    dto.password = '123';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('password');
  });
});
