export default {
  methods: {
    toYmdHms(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, 0);
      const _date = String(date.getDate()).padStart(2, 0);
      const hours = String(date.getHours()).padStart(2, 0);
      const minutes = String(date.getMinutes()).padStart(2, 0);
      const seconds = String(date.getSeconds()).padStart(2, 0);
      return `${year}-${month}-${_date} ${hours}:${minutes}:${seconds}`;
    },
  },
};
