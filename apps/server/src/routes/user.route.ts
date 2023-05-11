/* Imports */
import { Router } from 'express';
import { index, show, store, update, destroy } from '../controllers/user.controller';
import authAccessToken from '../middlewares/authAccessToken';
import { guard } from '../middlewares/guard';
import showRequest from '../requests/user/show.request';
import indexRequest from '../requests/user/index.request';
import storeRequest from '../requests/user/store.request';
import updateRequest from '../requests/user/update.request';
import destroyRequest from '../requests/user/destroy.request';

/* router */
const router = Router();

/* get users */
router.get('/', [authAccessToken, guard(indexRequest)], index);

/* get single user */
router.get('/:id', [authAccessToken, guard(showRequest)], show);

/* created user */
router.post('/', [authAccessToken, guard(storeRequest)], store);

/* update user */
router.patch('/:id', [authAccessToken, guard(updateRequest)], update);

/* delete user */
router.delete('/:id', [authAccessToken, guard(destroyRequest)], destroy);

export default router;
