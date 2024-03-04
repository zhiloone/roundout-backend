import { ParamsOptions } from '@nestjsx/crud';

export const nestjsxCrudIdParam: ParamsOptions = {
  id: {
    field: 'id',
    type: 'uuid',
    primary: true,
  },
};
