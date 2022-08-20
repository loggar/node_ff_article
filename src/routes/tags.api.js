import { Router } from 'express';
import moment from 'moment';

import articleService from '../service/article.service';

const router = Router();

router.get('/:tagName/:date', (req, res) => {
  const { tagName, date } = req.params;

  const m = moment(date, 'YYYYMMDD', true);
  if (!m.isValid()) {
    throw new Error('invalid format: date');
  }

  res.json(
    articleService.search({
      tag: tagName,
      date: m.format('YYYY-MM-DD'),
    })
  );
});

module.exports = router;
