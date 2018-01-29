const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'You should enter some text'],
        minlength: [5, 'Text should be at least 5 characters'],
        trim: true,
    },
    createDate: {
        type: String,
        default: formattedDate(new Date()),
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Number,
        default: null,
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});
function formattedDate(d) {
	let month = String(d.getMonth() + 1);
	let day = String(d.getDate());
	const year = String(d.getFullYear());

	if (month.length < 2) month = `0${month}`;
	if (day.length < 2) day = `0${day}`;

	return `${month}/${day}/${year}`;
}
module.exports = mongoose.model('Todo', todoSchema);
