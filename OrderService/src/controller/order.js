exports.getAllOrders = (req,res) => {
    res.json([
        {
            _id: '1',
            name: 'order 1'
        },
        {
            _id: '2',
            name: 'order 2'
        }
    ])
}