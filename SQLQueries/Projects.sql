create extension if not exists "uuid-ossp";

create table if not exists projects (
    project_id uuid default uuid_generate_v4(),
    title varchar (50) not null,
    project_status varchar(50) not null,
    description varchar(300) not null,
    owner_id uuid not null,
    PRIMARY KEY(project_id)
)