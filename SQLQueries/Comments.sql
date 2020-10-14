create table if not exists comments (
comment_id uuid default uuid_generate_v4(),
comment_title varchar(50) not null,
comment_body varchar(3000) not null,
comment_time timestamp with time zone,
project_id uuid not null
);