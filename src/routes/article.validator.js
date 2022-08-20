import { validate, ValidationError } from 'jsonschema';
import moment from 'moment';

const validateArticle = (() => {
  const schema = () => ({
    type: 'object',
    properties: {
      id: {
        type: 'string',
        minLength: 1,
        maxLength: 9,
        pattern: '\\d+',
      },
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 512,
      },
      date: {
        type: 'string',
      },
      body: {
        type: 'string',
        minLength: 1,
        maxLength: 2048,
      },
      tags: {
        type: 'array',
        items: { type: 'string', minLength: 1, maxLength: 128 },
      },
    },
    required: ['id', 'title', 'date', 'body'],
  });

  const validateDate = (str) => {
    const m = moment(str, 'YYYY-MM-DD', true);
    if (!m.isValid()) {
      const e = new ValidationError('is invalid date');
      e.name = 'dateFormat';
      e.property = 'instance.date';
      return e;
    }
    return null;
  };

  const check = (o) => {
    const v = validate(o, schema());
    const d = validateDate(o.date);
    if (d) v.errors.push(d);
    return v;
  };

  return check;
})();

export default validateArticle;
