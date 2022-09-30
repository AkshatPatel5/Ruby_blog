require 'bcrypt'
module Akshatcrypt
    class Engine
      DEFAULT_COST    = 12
      MIN_COST        = 4
      MAX_COST = 31
      MAX_SECRET_BYTESIZE = 72
      MAX_SALT_LENGTH = 16
  
      @cost = nil

      def self.cost
        @cost || DEFAULT_COST
      end
  
      def self.cost=(cost)
        @cost = cost
      end

      def self.hash_secret(secret, salt, _ = nil)
        unless _.nil?
          warn "[DEPRECATION] Passing the third argument to " \
               "`BCrypt::Engine.hash_secret` is deprecated. " \
               "Please do not pass the third argument which " \
               "is currently not used."
        end
  
        if valid_secret?(secret)
          if valid_salt?(salt)
            if RUBY_PLATFORM == "java"
              Java.bcrypt_jruby.Akshatcrypt.hashpw(secret.to_s.to_java_bytes, salt.to_s)
            else
              secret = secret.to_s
              secret = secret.byteslice(0, MAX_SECRET_BYTESIZE) if secret && secret.bytesize > MAX_SECRET_BYTESIZE
              __bc_crypt(secret, salt)
            end
          else
            raise Errors::InvalidSalt.new("invalid salt")
          end
        else
          raise Errors::InvalidSecret.new("invalid secret")
        end
      end
  
      def self.generate_salt(cost = self.cost)
        cost = cost.to_i
        if cost > 0
          if cost < MIN_COST
            cost = MIN_COST
          end
          BCrypt::Engine.generate_salt(cost)
        else
          raise Errors::InvalidCost.new("cost must be numeric and > 0")
        end
      end
  
      def self.valid_salt?(salt)
        !!(salt =~ /\A\$[0-9a-z]{2,}\$[0-9]{2,}\$[A-Za-z0-9\.\/]{22,}\z/)
      end
  
      def self.valid_secret?(secret)
        secret.respond_to?(:to_s)
      end

      def self.calibrate(upper_time_limit_in_ms)
        (Akshatcrypt::Engine::MIN_COST..Akshatcrypt::Engine::MAX_COST-1).each do |i|
          start_time = Time.now
          Password.create("testing testing", :cost => i+1)
          end_time = Time.now - start_time
          return i if end_time * 1_000 > upper_time_limit_in_ms
        end
      end
  
      def self.autodetect_cost(salt)
        salt[4..5].to_i
      end
    end
  
  end