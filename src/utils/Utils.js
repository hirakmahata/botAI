export const formatAMPM = (date, singleMessage) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  singleMessage.chatTime = strTime;
  return strTime;
};

export const groupMessagesByDate = (messages) => {
  const groupedMessages = messages.reduce((acc, message) => {
    const date = message.timestamp.toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {});
  return groupedMessages;
};

export const addChatsToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getChatsFromLocalStorage = (key) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    return JSON.parse(storedValue);
  }
  return false;
};
export const deleteChatsFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const updateChatsInLocalStorage = (key, data) => {
  let previousValue = localStorage.getItem(key);
  if (previousValue) {
    previousValue = JSON.parse(previousValue);
    deleteChatsFromLocalStorage(key);
    for (let key in data) {
      if (!previousValue[key]) {
        previousValue[key] = data[key];
      }
      previousValue[key] = [...previousValue[key], ...data[key]];
    }
  } else {
    previousValue = data;
  }
  addChatsToLocalStorage(key, previousValue);
};

export const insertArrayOnObjectKey = (obj, key, data) => {
  if (obj[key]) {
    obj[key].push(data);
  } else {
    obj[key] = [data];
  }
};

export const filterMessagesAccordingToRating = (
  messages,
  providedRating = 0
) => {
  const newMessageFormat = {};

  for (let key in messages) {
    for (let i = 0; i < messages[key].length; i++) {
      if (providedRating > 0) {
        if (
          messages[key][i].rating !== undefined &&
          messages[key][i].rating === providedRating
        ) {
          insertArrayOnObjectKey(newMessageFormat, key, [
            messages[key][i - 1],
            messages[key][i],
          ]);
        }
      } else {
        if (messages[key][i]?.sender === "system") {
          insertArrayOnObjectKey(newMessageFormat, key, [
            messages[key][i - 1],
            messages[key][i],
          ]);
        }
      }
    }
  }
  return newMessageFormat;
};
