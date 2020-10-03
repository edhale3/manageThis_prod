create extension if not exists "uuid-ossp";

create table if not exists accounts (
    account_id uuid default uuid_generate_v4(),
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    email varchar(100) not null,
    gender varchar(6) not null,
    password varchar(100) not null,
    PRIMARY KEY(account_id)
);