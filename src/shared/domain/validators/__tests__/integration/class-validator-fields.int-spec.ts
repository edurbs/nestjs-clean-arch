import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'

class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  constructor(data: any) {
    Object.assign(this, data)
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  validade(data: any): boolean {
    return super.validate(new StubRules(data))
  }
}

describe('Class validator fields integration tests', () => {
  it('should validate with errors', () => {
    const validator = new StubClassValidatorFields()
    expect(validator.validade(null)).toBeFalsy()
    expect(validator.errors).toStrictEqual({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ],
      price: [
        'price should not be empty',
        'price must be a number conforming to the specified constraints',
      ],
    })
  })
  it('should validate without errors', () => {
    const validator = new StubClassValidatorFields()
    const data = new StubRules({ name: 'value', price: 10 })
    expect(validator.validade(data)).toBeTruthy()
    expect(validator.validatedData).toStrictEqual(data)
  })
})