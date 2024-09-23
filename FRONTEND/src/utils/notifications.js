import { toast } from 'react-toastify';
const autoCloseTime = 2500;
export const notify = {
	success: (message, autoClose = true) =>
		toast.success(message, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: autoClose ? autoCloseTime : false,
			...commonProps()
		}),
	error: (message, autoClose = true) =>
		toast.error(message, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: autoClose ? autoCloseTime : false,
			...commonProps()
		}),
	info: (message, autoClose = true) =>
		toast.info(message, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: autoClose ? autoCloseTime : false,
			...commonProps()
		}),
	warning: (message, autoClose = true) =>
		toast.warn(message, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: autoClose ? autoCloseTime : false,
			...commonProps()
		}),
	close: () => toast.dismiss()
};

export const notifyTypes = {
	WARN: toast.TYPE.WARNING,
	ERROR: toast.TYPE.ERROR,
	INFO: toast.TYPE.INFO,
	SUCCESS: toast.TYPE.SUCCESS
};

export const commonProps = () => ({
	position: toast.POSITION.TOP_RIGHT,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: false,
	progress: undefined
});