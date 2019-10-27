module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    logging: true,
    entities: [process.env.NODE_ENV === 'production' ? './src/**/*.entity.ts': undefined, './dist/**/*.entity.js']
}