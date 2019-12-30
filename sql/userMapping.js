let User = {
    insert: 'insert into t_user_account(UserAccount,UserPwd,CreateTime,UpdateTime) values(?,?,?,?);',
    update: 'update t_user_account set name=?, age=? where id=?;',
    delete: 'delete from t_user_account where id=?;',
    queryAllById: 'select id,UserAccount,UserStatus,UserStatusNow,CreateTime from t_user_account t where t.id=?;',
    queryAllByAccount: 'select id,UserAccount,UserStatus,UserStatusNow,CreateTime from t_user_account t where t.UserAccount=?;',
    queryByAccount: 'select id,UserAccount,UserPwd from t_user_account t where t.UserAccount=?;',
    queryCountByAccount: 'select count(UserAccount) as userAccount from t_user_account where UserAccount=?;',
    queryAll: 'select * from t_user_account where 1=1;'
}

module.exports = User;