'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Todos', 'UserId', {
      type: Sequelize.INTEGER,

      //設定這是必填欄位。
      allowNull: false,

      //設定這欄位是跟 Users 資料表裡的 id 欄位的關聯。
      references: {
        model: 'Users',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('Todos', 'UserId')
  }
};
