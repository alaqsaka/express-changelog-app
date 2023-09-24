import prisma from "../db"

// Crate update
export const createUpdate = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            id: req.body.productId,
            belongsToId: req.user.id
        }
    })

    if (!product) return res.json({ data: null, message: 'Product not found' });

    const update = await prisma.update.create({
        data: {
            body: req.body.body,
            title: req.body.title, 
            asset: req.body.asset, 
            status: req.body.status, 
            version: req.body.version, 
            productId: product.id,
        }
    })

    return res.json({data: update})
}