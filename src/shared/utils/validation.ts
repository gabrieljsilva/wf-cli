import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export async function validateOrThrowError(
  data: any,
  validatorClass: ClassConstructor<any>,
) {
  const parsed = plainToInstance(validatorClass, data);
  const errors = await validate(parsed);

  if (errors.length > 0) {
    errors.forEach((error) => {
      const constraints = Object.values(error.constraints);
      constraints.forEach((constraint) => {
        console.error(constraint);
        process.exit(1);
      });
    });
  }
}
