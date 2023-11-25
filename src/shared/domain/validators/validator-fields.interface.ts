export type FieldErrors = {
  [field: string]: string[]
}

export interface ValidatorFieldsInterface<PropsValidated> {
  erros: FieldErrors
  validatedData: PropsValidated
  validate(data: any): boolean
}
