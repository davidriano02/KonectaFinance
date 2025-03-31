import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";

class Sale extends Model<InferAttributes<Sale>, InferCreationAttributes<Sale>> {
    declare id: CreationOptional<number>;
    declare product: "Consumer Credit" | "Payroll Loan" | "Credit Card";
    declare requested_quota: string;
    declare franchise?: "AMEX" | "VISA" | "MASTERCARD";
    declare rate?: number;
    declare userId: ForeignKey<User["id"]>;
}

Sale.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product: {
            type: DataTypes.ENUM("Consumer Credit", "Payroll Loan", "Credit Card"),
            allowNull: false,
        },
        requested_quota: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        franchise: {
            type: DataTypes.ENUM("AMEX", "VISA", "MASTERCARD"),
            allowNull: true,
        },
        rate: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "sales",
        timestamps: true,
    }
);


Sale.belongsTo(User, { as: "creator", foreignKey: "id" });

export default Sale;
