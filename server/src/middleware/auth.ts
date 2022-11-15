import {Request, Response, NextFunction} from 'express'

export default function(req: Request, res: Response, next: NextFunction) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/login')
    }

    next()
}
