import dayjs from "dayjs";

const format = "HH:mm";

export const extractHourAndMinute = (timeString: string): { hour: number, minute: number } => {
    const parsedTime = dayjs(timeString, format);
    const hour = parsedTime.hour();
    const minute = parsedTime.minute();
    return { hour, minute };
};

