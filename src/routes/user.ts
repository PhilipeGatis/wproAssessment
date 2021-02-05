import { Router } from 'express';
import auth from '@provi/middlewares/auth';
import validate from '@provi/middlewares/validate';
import validateFlow from '@provi/middlewares/validateFlow';
import * as userValidation from '@provi/validations/user';
import * as loggedUserController from '@provi/controllers/loggedUser';

export default (router: Router) => {
  router.post('/cpf', auth(), validate(userValidation.updateCpf), validateFlow, loggedUserController.updateUser);
  router.post(
    '/full-name',
    auth(),
    validate(userValidation.updateFullName),
    validateFlow,
    loggedUserController.updateUser,
  );
  router.post(
    '/birthday',
    auth(),
    validate(userValidation.updateBirthday),
    validateFlow,
    loggedUserController.updateUser,
  );
  router.post(
    '/phone-number',
    auth(),
    validate(userValidation.updatePhonenumber),
    validateFlow,
    loggedUserController.updateUser,
  );
  router.post(
    '/address',
    auth(),
    validate(userValidation.updateAddress),
    validateFlow,
    loggedUserController.updateUser,
  );
  router.post(
    '/loan-request',
    auth(),
    validate(userValidation.updateLoanRequest),
    validateFlow,
    loggedUserController.updateUser,
  );
  return router;
};

/**
 * @swagger
 * tags:
 *   name: user
 *   description: User management and retrieval
 */

/**
 * @swagger
 * path:
 *  /user/cpf:
 *    post:
 *      summary: Update CPF Value
 *      description: update cpf field to logged user.
 *      tags: [user]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - cpf
 *              properties:
 *                cpf:
 *                  type: string
 *              example:
 *                  cpf: "48096454013"
 *      responses:
 *        "200":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "400":
 *          description: bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "401":
 *          description: Invalid email or password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid email or password
 */

/**
 * @swagger
 * path:
 *  /user/full-name:
 *    post:
 *      summary: Update full-name Value
 *      description: update full-name field to logged user.
 *      tags: [user]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - fullName
 *              properties:
 *                fullName:
 *                  type: string
 *              example:
 *                  fullName: Mary Poppins
 *      responses:
 *        "200":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "400":
 *          description: bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "401":
 *          description: Invalid email or password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid email or password
 */

/**
 * @swagger
 * path:
 *  /user/birthday:
 *    post:
 *      summary: Update birthday Value
 *      description: update birthday field to logged user.
 *      tags: [user]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - birthday
 *              properties:
 *                birthday:
 *                  type: string
 *                  format: date  # or date-time
 *              example:
 *                  birthday: "1900-01-01T23:59:59.000Z"
 *      responses:
 *        "200":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "400":
 *          description: bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "401":
 *          description: Invalid email or password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid email or password
 */

/**
 * @swagger
 * path:
 *  /user/phone-number:
 *    post:
 *      summary: Update phone-number Value
 *      description: update phone-number field to logged user.
 *      tags: [user]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - phoneNumber
 *              properties:
 *                phoneNumber:
 *                  type: number
 *              example:
 *                  phoneNumber: 48096454013
 *      responses:
 *        "200":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "400":
 *          description: bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "401":
 *          description: Invalid email or password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid email or password
 *
 */

/**
 * @swagger
 * path:
 *  /user/address:
 *    post:
 *      summary: Update address Value
 *      description: update address field to logged user.
 *      tags: [user]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - address
 *              properties:
 *                address:
 *                  type: object
 *                  properties:
 *                    cep:
 *                      type: number
 *                    street:
 *                      type: string
 *                    number:
 *                      type: string
 *                    complement:
 *                      type: string
 *                    city:
 *                      type: string
 *                    state:
 *                      type: string
 *              example:
 *                  address:
 *                      cep: 00000000
 *                      street: Rua a
 *                      number: 10
 *                      complement: apt 10
 *                      city: São Paulo
 *                      state: SP
 *      responses:
 *        "200":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "400":
 *          description: bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "401":
 *          description: Invalid email or password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid email or password
 */

/**
 * @swagger
 * path:
 *  /user/loan-request:
 *    post:
 *      summary: request loan.
 *      description: loan request in cents.
 *      tags: [user]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - loan
 *              properties:
 *                loan:
 *                  type: object
 *                  properties:
 *                    request:
 *                      type: number
 *              example:
 *                  loan:
 *                      request: 10000
 *      responses:
 *        "200":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "400":
 *          description: bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "401":
 *          description: Invalid email or password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid email or password
 */
