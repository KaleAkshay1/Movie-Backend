const convert24Hour = (time) => {
  const [hours, minutes] = time.split(":");
  const [minut, ampm] = minutes.split(" ");
  const hour = parseInt(hours);
  if (ampm === "PM") {
    if (hour === 12) {
      return `${hour}:${minut}`;
    } else {
      return `${hour + 12}:${minut}`;
    }
  } else if (ampm === "AM") {
    if (hour === 12) {
      return `00:${minut}`;
    } else {
      return `${hour}:${minut}`;
    }
  }
};

export default convert24Hour;
