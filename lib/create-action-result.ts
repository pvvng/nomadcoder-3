export function createActionResult<T = undefined>({
  success,
  result,
  formErrors,
  fieldErrors,
}: {
  success: boolean;
  result?: T;
  formErrors?: string[];
  fieldErrors?: { [key: string]: string[] | undefined };
}) {
  return {
    success,
    result,
    formErrors: formErrors ?? [],
    fieldErrors: fieldErrors ?? {},
  };
}

export const deafultActionStateValue = {
  success: false,
  result: undefined,
  formErrors: [],
  fieldErrors: {},
};
