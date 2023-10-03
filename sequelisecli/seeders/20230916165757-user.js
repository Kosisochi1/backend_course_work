'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert('users', [
			{
				id: 3,
				firstName: 'Emmanuel',
				lastName: 'Ezeoyiri',
				email: 'emmanuel@gmail.com',
				password: 'kosi',
				Sex: 'male',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				firstName: 'Emmanuella',
				lastName: 'Ezeoyiriokwor',
				email: 'emmanuella@gmail.com',
				password: 'kosii',

				Sex: 'female',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('users', { email: 'emmanuel@gmail.com' });
	},
};
