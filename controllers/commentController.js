
const { Pizza, Comment } = require('../models');


const commentController = {
    // add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
                // find the pizza the comment should associate with
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    // mongo based function $
                    { $push: { comments: _id } },
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData)
            })
            .catch(err => res.json(err));

    },

    //remove comment 
    removeComment({ params }, res) {
        Comment.findByIdAndDelete({ _id: params.commentId })
            .then(deletedComment => {
                if (!deletedComment) {
                    return res.status(404).json({ message: 'No comment with this id!' });
                }
                return Pizza.findOneAndUpate(
                    { _id: params.pizzaId },
                    { $push: { comments: params.commentId } },
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    return res.status(404).json({ message: 'No pizza found with this id!' });
                }
                res.json(dbPizzaData);

            })
            .catch(err => res.json(err))

    }

};

module.exports = commentController;