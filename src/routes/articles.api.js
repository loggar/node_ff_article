import { Router } from 'express';

import articleService from '../service/article.service';
import validateArticle from './article.validator';

const router = Router();

router.post('/', (req, res) => {
  const article = { ...req.body.article };

  const validates = validateArticle(article);
  if (validates.errors.length > 0) {
    const messages = validates.errors.map((e) => `${e.property} ${e.message}`);
    throw new Error(messages);
  }

  res.json(articleService.save(article));
});

router.get('/:id', (req, res) => {
  res.json(articleService.getOne(req.params.id));
});

module.exports = router;
