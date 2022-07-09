-- ユーザーテーブル作成
create table if not exists users (
  id serial,
  name varchar(50) not null unique,
  password varchar not null,
  created_at timestamp,
  updated_at timestamp
);

-- 初期ユーザー作成
insert into users (
  name,
  password,
  created_at,
  updated_at
) values (
  'test',
  '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
  now(),
  now()
);
