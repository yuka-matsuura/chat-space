# README

# 開発環境
* Ruby 2.3.1

# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|
* nameカラムにindexを貼る

### アソシエーション（usersテーブル）
- has_many :groups, through: :members
- has_many :members
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### アソシエーション（groupsテーブル）
- has_many :users, through: :members
- has_many :members
- has_many :messages

## membersテーブル(usersテーブルとgroupsテーブルの中間テーブル)

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### アソシエーション（membersテーブル）
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|image|string||
|content|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### アソシエーション（messagesテーブル）
- belongs_to :group
- belongs_to :user


