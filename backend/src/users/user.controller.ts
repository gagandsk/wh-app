import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator'; 
import { UserService } from './user.service';
import { UserPaginationParams } from '../types';

const router = Router();
const userService = new UserService();

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const handleValidationErrors = (req: Request) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error('Error de validación: ' + errors.array().map(e => e.msg).join(', '));
        // @ts-ignore
        err.status = 400;
        throw err;
    }
};

const validateUuidManually = (id: string, next: NextFunction) => {
    if (!uuidRegex.test(id)) {
        const err = new Error('ID de usuario debe ser un UUID válido.');
        // @ts-ignore
        err.status = 400;
        return next(err);
    }
};

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params: UserPaginationParams = {
            page: parseInt(req.query.page as string) || 1,
            limit: parseInt(req.query.limit as string) || 10,
            filter: req.query.filter as string || '',
        };

        const result = await userService.findAll(params); 
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/',
    [
        body('name').trim().notEmpty().withMessage('El nombre es requerido.'),
        body('email').isEmail().withMessage('El email debe ser válido.'),
        body('role').isIn(['admin', 'editor', 'viewer']).withMessage('Rol no válido.'),
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            handleValidationErrors(req);
            const data = req.body;
            
            const newUser = await userService.createUser(data);
            res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id', 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string; 
            
            validateUuidManually(id, next);
            const user = await userService.findById(id); 
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

//TODO - da error de cors al actualizar usuario
router.patch(
    '/:id',
    [
        body('email').optional().isEmail().withMessage('El email debe ser válido.'),
        body('role').optional().isIn(['admin', 'editor', 'viewer']).withMessage('Rol no válido.'),
        body('status').optional().isIn(['active', 'inactive']).withMessage('Estado no válido.'),
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;
            validateUuidManually(id, next); 
            handleValidationErrors(req);
            const updateData = req.body;
            const updatedUser = await userService.update(id, updateData); 
            res.json({ message: 'Usuario actualizado con éxito', user: updatedUser });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;
            validateUuidManually(id, next); 
            console.log("ID recibido para eliminación (TEST):", id); 
            await userService.delete(id); 
            res.json({ message: 'Usuario eliminado con éxito' });
        } catch (error) {
            next(error);
        }
    }
);

export const UserController = router;